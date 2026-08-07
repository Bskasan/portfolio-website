export type ContentButton = {
  label: string;
  url: string;
};

export type ContentItem = {
  id: number | string;
  name: string;
  description: string;
  thumbnail: string | null;
  year: string;
  status: {
    key: string;
    value: string;
  };
  tags?: string[];
  primaryButton?: ContentButton;
  secondaryButton?: ContentButton;
  tertiaryButton?: ContentButton;
};
