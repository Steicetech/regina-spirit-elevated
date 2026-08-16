export type Award = {
  competition: string;
  fair: string;
  product: string;
  placement: string;
  year: string;
  city: string;
  proofImage?: string;
  verified: boolean;
};

/**
 * La sezione premi viene mostrata solo quando showAwardsSection è true
 * e almeno un premio ha verified: true.
 * Nessun dato viene inventato: tutto resta [DA CONFERMARE].
 */
export const showAwardsSection = false;

export const awards: Award[] = [
  {
    competition: "[DA CONFERMARE]",
    fair: "[DA CONFERMARE]",
    product: "[DA CONFERMARE]",
    placement: "Secondo posto",
    year: "[DA CONFERMARE]",
    city: "[DA CONFERMARE]",
    verified: false,
  },
  {
    competition: "[DA CONFERMARE]",
    fair: "[DA CONFERMARE]",
    product: "[DA CONFERMARE]",
    placement: "Secondo posto",
    year: "[DA CONFERMARE]",
    city: "[DA CONFERMARE]",
    verified: false,
  },
];

export const verifiedAwards = awards.filter((a) => a.verified);
