import {
  getStepsOfUser,
  getUserById,
} from "@/server-requests/user.server-request";
import { PageUrls, Role } from "@/lib/app-types";
import {
  ONBOARDING_STEPS,
  PredefinedSystemRoles,
  StepNames,
} from "@/lib/app-types";
import { getSession } from "@/services/cookie-handler.service";

export function selectFirstRole(roles: Role[]) {
  if (roles?.length === 0 || !roles) return null;

  return roles[0];
}

export async function getUserRole() {
  const session = getSession({ isServer: true });

  if (session) {
    const userDetails = await getUserById(parseInt(session.id));

    if (!userDetails) return null;

    return userDetails.userRoleClub?.role?.id;
  }

  return null;
}

export const getUserNextStepRedirection = async () => {
  const steps = await getStepsOfUser();
  return steps;
};

export const getOnboardingNextStep = async (
  steps: {
    __typename?: "Step";
    id: string;
    name: StepNames;
  }[]
) => {
  if (!steps || steps.length === 0) return PageUrls.LOGOUT;

  const completedSteps = steps.map((step) => step.name.toString());

  const stepMapping = {
    [StepNames.registration]: ONBOARDING_STEPS.REGISTRATION,
    [StepNames.email_verification]: ONBOARDING_STEPS.STEP_1,
    [StepNames.user_type_selection]: ONBOARDING_STEPS.STEP_2,
  };

  const lastStep = {
    last_step: ONBOARDING_STEPS.LAST_STEP,
  };

  const clubOwnerStepMappingAfterUserTypeSelection = {
    [StepNames.club_information_insertion]: ONBOARDING_STEPS.STEP_3_CLUB,
    ...lastStep,
  };

  const playerStepMappingAfterUserTypeSelection = {
    [StepNames.club_selection]: ONBOARDING_STEPS.STEP_3_PLAYER,
    ...lastStep,
  };

  for (const step in stepMapping) {
    if (!completedSteps.includes(step)) {
      return stepMapping[step as keyof typeof stepMapping];
    } else {
      if (
        step === StepNames.user_type_selection &&
        completedSteps.includes(StepNames.user_type_selection)
      ) {
        if (
          completedSteps.findIndex(
            (s) => s === StepNames.user_type_selection
          ) ===
          completedSteps.length - 1
        ) {
          const session = getSession({ isServer: true });

          if (session && session.id) {
            const userRole = await getUserRole();

            if (userRole) {
              if (userRole === PredefinedSystemRoles.clubOwner) {
                return clubOwnerStepMappingAfterUserTypeSelection.club_information_insertion;
              } else {
                return playerStepMappingAfterUserTypeSelection.club_selection;
              }
            }
          }
        } else {
          return lastStep.last_step;
        }
      }
    }
  }

  return lastStep.last_step;
};

export const checkIfAllOnboardingStepsCompleted = async () => {
  const steps = await getUserNextStepRedirection();

  if (!steps) return { isAllStepsCompleted: false, steps: [] };

  const completedSteps = steps.map((step) => step.name.toString());

  if (
    completedSteps.includes(StepNames.club_information_insertion) ||
    completedSteps.includes(StepNames.club_selection)
  ) {
    return { isAllStepsCompleted: true, steps };
  }

  return { isAllStepsCompleted: false, steps };
};
