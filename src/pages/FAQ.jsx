
import { Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@mui/material';
import { ExpandMore, Person, CreditCard, LocalGasStation, DirectionsCar, Cancel } from '@mui/icons-material';

const FAQ = () => {
  const faqData = [
    {
      question: 'How old do I need to be to rent a car?',
      answer: 'You must be at least 18 years old to rent a car with us.',
      icon: <Person />,
    },
    {
      question: 'What documents do I need to rent a car?',
      answer: 'You will need a valid driver\'s license and a credit card in your name.',
      icon: <CreditCard />,
    },
    {
      question: 'Is insurance included in the rental price?',
      answer: 'Yes, our rental price includes basic insurance coverage.',
      icon: <LocalGasStation />,
    },
    {
      question: 'What is the minimum rental period?',
      answer: 'The minimum rental period is 24 hours.',
      icon: <DirectionsCar />,
    },
    {
      question: 'Can I cancel or modify my reservation?',
      answer: 'Yes, you can cancel or modify your reservation up to 24 hours before the scheduled pickup time.',
      icon: <Cancel />,
    },
   
  ];

  return (
    <Grid container spacing={2}>
    <Grid item xs={12}>
      <Typography variant="h2" component="h2" align="center" gutterBottom>
        Frequently Asked Questions
      </Typography>
    </Grid>

    <Grid item xs={12} sx={{ margin: '0 3rem' }}>
      <Grid container spacing={2}>
        {faqData.map((faq, index) => (
          <Grid item xs={12} key={index}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />} aria-controls={`faq-content-${index}`} id={`faq-heading-${index}`}>
                <Typography variant="h5">{faq.question}</Typography>
                {faq.icon}
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
    </Grid>
  </Grid>
);
};

export default FAQ;
