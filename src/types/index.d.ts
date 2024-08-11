// routes/types/index.d.ts
declare global {
  export enum NumberType {
    Integer = 'integer',
    Float = 'float'
  }

  export enum TextType {
    Title = 'title',
    Headline = 'headline',
    Subheadline = 'subheadline',
    Body = 'body',
    Callout = 'callout',
    Caption = 'caption',
  }

  export enum Alignment {
    Start = 'start',
    Center = 'center',
    End = 'end',
  }

  export enum Direction {
    Row = 'row',
    Column = 'column',
  }
}

export {};
