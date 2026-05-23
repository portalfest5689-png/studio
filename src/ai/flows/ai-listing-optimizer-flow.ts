'use server';
/**
 * @fileOverview A GenAI tool to automatically generate compelling and professional marketing descriptions for property listings.
 *
 * - generatePropertyMarketingDescription - A function that handles the generation of property marketing descriptions.
 * - AiListingOptimizerInput - The input type for the generatePropertyMarketingDescription function.
 * - AiListingOptimizerOutput - The return type for the generatePropertyMarketingDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiListingOptimizerInputSchema = z.object({
  propertyType: z.string().describe('The type of property (e.g., apartamento, casa, terreno).'),
  address: z.string().optional().describe('The full address of the property.'),
  city: z.string().describe('The city where the property is located.'),
  neighborhood: z.string().describe('The neighborhood where the property is located.'),
  bedrooms: z.number().optional().describe('Number of bedrooms.'),
  bathrooms: z.number().optional().describe('Number of bathrooms.'),
  suites: z.number().optional().describe('Number of suites.'),
  parkingSpaces: z.number().optional().describe('Number of parking spaces.'),
  usefulAreaSqM: z.number().optional().describe('Useful area in square meters.'),
  totalAreaSqM: z.number().optional().describe('Total area in square meters.'),
  sellPrice: z.string().optional().describe('Formatted selling price, if applicable (e.g., R$ 1.500.000).'),
  rentPrice: z.string().optional().describe('Formatted rental price, if applicable (e.g., R$ 5.000/mês).'),
  keyFeatures: z.string().describe('Comma-separated list or short description of key features and amenities (e.g., piscina, churrasqueira, academia, segurança 24h).'),
  specialSellingPoints: z.string().optional().describe('Any unique or special selling points (e.g., vista panorâmica, próximo ao metrô, recém-reformado).'),
});
export type AiListingOptimizerInput = z.infer<typeof AiListingOptimizerInputSchema>;

const AiListingOptimizerOutputSchema = z.object({
  marketingDescription: z.string().describe('A compelling and professional marketing description for the property listing.'),
});
export type AiListingOptimizerOutput = z.infer<typeof AiListingOptimizerOutputSchema>;

export async function generatePropertyMarketingDescription(input: AiListingOptimizerInput): Promise<AiListingOptimizerOutput> {
  return aiListingOptimizerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiListingOptimizerPrompt',
  input: {schema: AiListingOptimizerInputSchema},
  output: {schema: AiListingOptimizerOutputSchema},
  prompt: `You are an expert real estate marketing copywriter. Your task is to create a highly compelling and professional marketing description for a property listing based on the provided details. Highlight the best features and benefits to attract potential buyers/renters. The description should be engaging, informative, and persuasive.

Property Details:
- Type: {{{propertyType}}}
{{#if address}}
- Address: {{{address}}}
{{/if}}
- City: {{{city}}}
- Neighborhood: {{{neighborhood}}}
{{#if bedrooms}}
- Bedrooms: {{{bedrooms}}}
{{/if}}
{{#if bathrooms}}
- Bathrooms: {{{bathrooms}}}
{{/if}}
{{#if suites}}
- Suites: {{{suites}}}
{{/if}}
{{#if parkingSpaces}}
- Parking Spaces: {{{parkingSpaces}}}
{{/if}}
{{#if usefulAreaSqM}}
- Useful Area: {{{usefulAreaSqM}}} m²
{{/if}}
{{#if totalAreaSqM}}
- Total Area: {{{totalAreaSqM}}} m²
{{/if}}
{{#if sellPrice}}
- Selling Price: {{{sellPrice}}}
{{/if}}
{{#if rentPrice}}
- Rental Price: {{{rentPrice}}}
{{/if}}
- Key Features: {{{keyFeatures}}}
{{#if specialSellingPoints}}
- Special Selling Points: {{{specialSellingPoints}}}
{{/if}}

Generate a marketing description that is professional, enticing, and highlights the unique value proposition of this property. Focus on benefits and an aspirational lifestyle. The tone should be enthusiastic and confident. Make sure to tailor the description to the property type and transaction (sell/rent).`,
});

const aiListingOptimizerFlow = ai.defineFlow(
  {
    name: 'aiListingOptimizerFlow',
    inputSchema: AiListingOptimizerInputSchema,
    outputSchema: AiListingOptimizerOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
