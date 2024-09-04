import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "Is there a free version of Bracket Boss?",
    answer: "Yes, Bracket Boss offers a free plan with limited features, perfect for small clubs.",
    value: "item-1",
  },
  {
    question: "How many tournaments can I manage with the free plan?",
    answer:
      "With the free plan, you can manage up to 1 tournament with basic scheduling and community support.",
    value: "item-2",
  },
  {
    question: "Can I upgrade or downgrade my subscription at any time?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time based on your club's needs.",
    value: "item-3",
  },
  {
    question: "Does Bracket Boss support real-time score tracking?",
    answer: "Yes, real-time score tracking is available on the Premium and Enterprise plans.",
    value: "item-4",
  },
  {
    question: "Is customer support available 24/7?",
    answer:
      "Priority support is available for Premium and Enterprise plans, ensuring your queries are answered promptly.",
    value: "item-5",
  },
];

export const FAQ = () => {
  return (
    <section
      id="faq"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion
        type="single"
        collapsible
        className="w-full AccordionRoot"
      >
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem
            key={value}
            value={value}
          >
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <a
          rel="noreferrer noopener"
          href="#"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contact us
        </a>
      </h3>
    </section>
  );
};
