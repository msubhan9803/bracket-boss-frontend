import { GET_STEPS_OF_USER, GET_USER_BY_ID } from "@/graphql/queries/users";
import { GetUserByIdQuery } from "@/graphql/generated/graphql";
import { graphqlRequestHandlerServer } from "@/lib/graphql-server";
import { ONBOARDING_STEPS, PredefinedSystemRoles, StepNames } from "@/lib/app-types";
import { getSession } from "@/services/cookie-handler.service";
import { selectFirstRole } from "@/services/user.service";

export const getUserById = async (userId: number) => {
  const data = await graphqlRequestHandlerServer({
    query: GET_USER_BY_ID,
    variables: { userId },
    options: { isServer: true },
  });

  return data.getUserById as GetUserByIdQuery["getUserById"];
};

export const getStepsOfUser = async () => {
  const data = await graphqlRequestHandlerServer({
    query: GET_STEPS_OF_USER,
    options: { isServer: true },
  });

  return data.getStepsOfUser;
};

export const getUserNextStepRedirection = async () => {
  const steps = await getStepsOfUser();
  return steps;
}

export const getOnboardingNextStep = async () => {
  const steps = await getUserNextStepRedirection();
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

          if (session && session.id && session.roles) {
            const userRole = selectFirstRole(session.roles);

            if (userRole) {
              if (userRole.id === PredefinedSystemRoles.clubOwner) {
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
