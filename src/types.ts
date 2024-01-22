export type ServiceYear = 2020 | 2021 | 2022;
export type ServiceType = "Photography" | "VideoRecording" | "BlurayPackage" | "TwoDayEvent" | "WeddingSession";

export type YearDiscount = {
    Year: ServiceYear,
    Discounts: Discount[],
}

export type Discount = {
    ServiceTypes: ServiceType[],
    Discount: number,
    DiscountApplicableServices: ServiceType[]
}

export type ServiceDependencies = {
    [service in ServiceType]: ServiceType[];
  };

export type PriceList = {
    Year: ServiceYear;
} & {
    [service in ServiceType]: number;
};