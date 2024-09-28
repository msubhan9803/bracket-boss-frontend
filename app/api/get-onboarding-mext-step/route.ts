import { getOnboardingNextStep } from "@/services/user.service";

export async function GET() {
  try {
    const nextStep = await getOnboardingNextStep();
    return Response.json({ nextStep });
  } catch (error) {
    return new Response(`Webhook error: ${error}`, {
      status: 400,
    });
  }
}
