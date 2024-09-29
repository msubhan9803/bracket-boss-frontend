import {
  checkIfAllOnboardingStepsCompleted,
  getOnboardingNextStep,
} from "@/services/user.service";

export async function GET() {
  try {
    const { steps } = await checkIfAllOnboardingStepsCompleted();
    const nextStep = await getOnboardingNextStep(steps as any);
    return Response.json({ nextStep });
  } catch (error) {
    return new Response(`Webhook error: ${error}`, {
      status: 400,
    });
  }
}
