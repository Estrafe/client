import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQ() {
    return (
        <Accordion
            type="single"
            collapsible
            className=" mx-auto grid grid-cols-1 md:grid-cols-2 gap-4"
        >
            <AccordionItem value="item-1">
                <AccordionTrigger>How do I book a train ticket?</AccordionTrigger>
                <AccordionContent>
                    You can book your train ticket directly through our website by selecting your desired route, travel dates, and seat preferences. Follow the on-screen instructions to complete your booking.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>What payment methods are accepted?</AccordionTrigger>
                <AccordionContent>
                    We accept various payment methods including credit/debit cards, PayPal, and other secure online payment options.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>Can I change or cancel my booking?</AccordionTrigger>
                <AccordionContent>
                    Yes, bookings can be modified or cancelled up to 24 hours before departure. Please review our cancellation policy for any fees or restrictions.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
                <AccordionTrigger>What is your refund policy?</AccordionTrigger>
                <AccordionContent>
                    Refunds are available under certain conditions according to our refund policy. If you need a refund, please contact customer support for assistance.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
                <AccordionTrigger>How do I receive my ticket?</AccordionTrigger>
                <AccordionContent>
                    Once your booking is complete, your ticket will be emailed to you and can also be accessed via our mobile app.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
                <AccordionTrigger>What are the baggage policies?</AccordionTrigger>
                <AccordionContent>
                    Our standard policy allows one carry-on and one checked bag free of charge. Additional or oversized luggage may incur extra fees.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
                <AccordionTrigger>Do I need to print my ticket?</AccordionTrigger>
                <AccordionContent>
                    No, our e-tickets are fully digital. You can display your ticket on your mobile device when boarding the train.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-8">
                <AccordionTrigger>What should I do if my train is delayed?</AccordionTrigger>
                <AccordionContent>
                    In the event of a delay, please check our website for real-time updates or contact our customer support team for further assistance.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-9">
                <AccordionTrigger>Can I book a group ticket?</AccordionTrigger>
                <AccordionContent>
                    Yes, group bookings are available for parties of 10 or more. Please contact our sales team for special rates and further details.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-10">
                <AccordionTrigger>How secure is my personal information?</AccordionTrigger>
                <AccordionContent>
                    Your personal information is protected using advanced encryption technologies and is handled in accordance with our strict privacy policy.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-11">
                <AccordionTrigger>Is there a loyalty program?</AccordionTrigger>
                <AccordionContent>
                    Yes, we offer a loyalty program that rewards frequent travelers with exclusive discounts, early access to promotions, and other benefits.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-12">
                <AccordionTrigger>What happens if I miss my train?</AccordionTrigger>
                <AccordionContent>
                    If you miss your train, please contact customer support immediately. Depending on your fare conditions, you might be eligible for a rebooking or refund.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
