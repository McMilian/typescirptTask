import { PriceList, ServiceDependencies, YearDiscount } from "./types";

export const SELECTION_DEPENDENCIES: ServiceDependencies = {
    Photography: [],
    VideoRecording: [],
    BlurayPackage: ["VideoRecording"],
    TwoDayEvent: ["Photography", "VideoRecording"], // One of dependency
    WeddingSession: [],
  };

export const PRICES: PriceList[] = [
    {
        "Year": 2020,
        "Photography": 1700,
        "VideoRecording": 1700,
        "BlurayPackage": 300,
        "TwoDayEvent": 400,
        "WeddingSession": 600
    },
    {
        "Year": 2021,
        "Photography": 1800,
        "VideoRecording": 1800,
        "BlurayPackage": 300,
        "TwoDayEvent": 400,
        "WeddingSession": 600
    },
    {
        "Year": 2022,
        "Photography": 1900,
        "VideoRecording": 1900,
        "BlurayPackage": 300,
        "TwoDayEvent": 400,
        "WeddingSession": 600
    }
];

export const DISCOUNTS: YearDiscount[] = [
    {
        "Year": 2020,
        "Discounts": [
            {
                "ServiceTypes": ["Photography", "VideoRecording"], // Each included dependency
                "Discount": 1200, // discount calculated easily from the description
                "DiscountApplicableServices": ["Photography", "VideoRecording"] // it means that other discounts related to those services cannot be applied in one order
            },
            {
                "ServiceTypes": ["Photography", "WeddingSession"],
                "Discount": 300,
                "DiscountApplicableServices": ["WeddingSession"]
            },
            {
                "ServiceTypes": ["VideoRecording", "WeddingSession"],
                "Discount": 300,
                "DiscountApplicableServices": ["WeddingSession"]
            }
        ]
    },
    {
        "Year": 2021,
        "Discounts": [
            {
                "ServiceTypes": ["Photography", "VideoRecording"],
                "Discount": 1300,
                "DiscountApplicableServices": ["Photography", "VideoRecording"]
            },
            {
                "ServiceTypes": ["Photography", "WeddingSession"],
                "Discount": 300,
                "DiscountApplicableServices": ["WeddingSession"]
            },
            {
                "ServiceTypes": ["VideoRecording", "WeddingSession"],
                "Discount": 300,
                "DiscountApplicableServices": ["WeddingSession"]
            }
        ]
    },
    {
        "Year": 2022,
        "Discounts": [
            {
                "ServiceTypes": ["Photography", "VideoRecording"],
                "Discount": 1300,
                "DiscountApplicableServices": ["Photography", "VideoRecording"]
            },
            {
                "ServiceTypes": ["Photography", "WeddingSession"],
                "Discount": 600,
                "DiscountApplicableServices": ["WeddingSession"]
            },
            {
                "ServiceTypes": ["VideoRecording", "WeddingSession"],
                "Discount": 300,
                "DiscountApplicableServices": ["WeddingSession"]
            }
        ]
    },
]