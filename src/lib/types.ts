export enum NumberType {
  Integer = 'integer',
  Float = 'float'
}

export enum HorizontalAlignment {
  Leading = 'leading',
  Center = 'center',
  Trailing = 'trailing',
}

export enum  VerticalAlignment {
  Top = 'top',
  Center = 'center',
  Bottom = 'bottom',
}

export interface Alignment {
  horizontal: HorizontalAlignment;
  vertical: VerticalAlignment;
}

  export enum TextType {
    Title = 'title',
    Headline = 'headline',
    Subheadline = 'subheadline',
    Body = 'body',
    Callout = 'callout',
    Caption = 'caption',
  }