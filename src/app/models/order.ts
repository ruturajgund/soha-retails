
export class Order{
    _id: string;
    amazonOrderId: string;
    asin: string;
    currency: string;
    fulfillmentChannel: string;
    giftWrapPrice: string;
    giftWrapTax: string;
    isBusinessOrder: boolean;
    itemPrice: string;
    itempromotionDiscount: string;
    itemStatus: string;
    itemTax: string;
    lastUpdatedDate: Date;
    merchantOrderId: string;
    orderChannel: string;
    orderStatus: string;
    priceDesignation: string;
    productName: string;
    promotionIds: string;
    purchaseDate: Date;
    purchaseOrderNumber: string;
    quantity: number;
    salesChannel: string;
    shipCity: string;
    shipCountry: string;
    shipPostalCode: number;
    shipPromotionDiscount: string;
    shipServiceLevel: string;
    shipState: string;
    shippingPrice: string;
    shippingTax: string;
    sku: string;
    url: string;
}