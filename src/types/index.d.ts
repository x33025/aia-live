// routes/types/index.d.ts
declare global {
  enum NumberType {
    Integer = 'integer',
    Float = 'float'
  }

  enum TextType {
    Title = 'title',
    Headline = 'headline',
    Subheadline = 'subheadline',
    Body = 'body',
    Callout = 'callout',
    Caption = 'caption',
  }

  enum Alignment {
    Start = 'start',
    Center = 'center',
    End = 'end',
  }

  enum Direction {
    Row = 'row',
    Column = 'column',
  }
}

export {};
