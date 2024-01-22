import { SELECTION_DEPENDENCIES } from "./data";
import { ServiceType } from "./types";

export const isAtLeastOneSelected = (availableServices: ServiceType[], selectedServices: ServiceType[]): boolean => 
    selectedServices.some((element) => availableServices.includes(element));

export const areIncluded = (selectedServices: ServiceType[], newSelection: ServiceType[]): boolean => 
    newSelection.every((element) => selectedServices.includes(element));

export const removeFromSelectedServices = (selectedServices: ServiceType[], serviceToRemove: ServiceType): void => {
    const index = selectedServices.indexOf(serviceToRemove);

    if (index !== -1) {
        selectedServices.splice(index, 1);
    }
};

export const getChildServices = (selectedService: ServiceType): ServiceType[] => {
    const childServices: ServiceType[] = [];
    
    for (const service in SELECTION_DEPENDENCIES) {
        if (SELECTION_DEPENDENCIES[service].includes(selectedService)) {
            childServices.push(service as ServiceType);
        }
    }
    
    return childServices;
}