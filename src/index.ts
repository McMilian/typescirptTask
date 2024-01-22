import { DISCOUNTS, PRICES, SELECTION_DEPENDENCIES } from "./data";
import { isAtLeastOneSelected, areIncluded, getChildServices, removeFromSelectedServices as removeServiceFromList } from "./helpers";
import { Discount, ServiceType, ServiceYear } from "./types";



export const updateSelectedServices = (
    previouslySelectedServices: ServiceType[],
    action: { type: "Select" | "Deselect"; service: ServiceType }
): ServiceType[] => {
    let selectedServices: ServiceType[] = []

    switch (action.type) {
        case "Select":
            if (isAtLeastOneSelected(previouslySelectedServices, [action.service])) {
                return previouslySelectedServices;
            }

            const dependencies: ServiceType[] = SELECTION_DEPENDENCIES[action.service]

            if (dependencies.length === 0 || isAtLeastOneSelected(previouslySelectedServices, dependencies)) {
                previouslySelectedServices.push(action.service);
            }

            return [...previouslySelectedServices, ...selectedServices]
        
        case "Deselect":
            if (!isAtLeastOneSelected(previouslySelectedServices, [action.service])) {
                return previouslySelectedServices;
            }

            removeServiceFromList(previouslySelectedServices, action.service);

            const childServices: ServiceType[] = getChildServices(action.service);
    
            if (isAtLeastOneSelected(previouslySelectedServices, childServices)) {
                childServices.forEach(childService => {

                    const parentServices = SELECTION_DEPENDENCIES[childService]
                    removeServiceFromList(parentServices, action.service)

                    if (isAtLeastOneSelected(previouslySelectedServices, parentServices)){
                        return;
                    }
                    else {
                        removeServiceFromList(previouslySelectedServices, childService);
                    }
                });
            }

            return [...previouslySelectedServices, ...selectedServices]
        default:
            return [...previouslySelectedServices]
    }
};

export const calculatePrice = (selectedServices: ServiceType[], selectedYear: ServiceYear) => {
    let basePrice = 0;
    let discounts = 0;

    const selectedYearPrices = PRICES.find(p => p.Year === selectedYear);

    if (selectedYearPrices) {
        selectedServices.forEach(st => {
            basePrice += selectedYearPrices[st];
        });
    }

    const selectedYearDiscounts = DISCOUNTS.find(d => d.Year === selectedYear)
    let allowedDiscounts: Discount[] = []
    let discountedServiceTypes: ServiceType[] = []; // I added this functionality this way, because the part of task description is not fully clear for me: "Any discounts should never be applied twice - greater discount wins" but accordting to tests there might be two discounts applied: discount for "package" Photograpy + VideoRecording and discount for WeddingSession

    if (selectedYearDiscounts && selectedYearDiscounts.Discounts) {
        selectedYearDiscounts.Discounts.forEach(discount => {
            if(areIncluded(selectedServices, discount.ServiceTypes)) {
                allowedDiscounts.push(discount)
            }
        })
    }

    allowedDiscounts.sort((a, b) => b.Discount - a.Discount).forEach(potentialDiscount => {
        if (areIncluded(discountedServiceTypes, potentialDiscount.DiscountApplicableServices)) {
            return;
        }
        else {
            discounts += potentialDiscount.Discount;
            discountedServiceTypes.push(...potentialDiscount.DiscountApplicableServices)
        }
    })

    return {basePrice: basePrice, finalPrice: basePrice - discounts}
};
