// src/lib/types/enums.ts

export enum NumberType {
  Integer = 'integer',
  Float = 'float',
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

// Renamed Direction enum to Horizontal and Vertical
export enum Direction {
  Horizontal = 'row',
  Vertical = 'column',
}

export enum ButtonType {
  Button = 'button',
  Submit = 'submit',
  Reset = 'reset',
}

export enum InputType {
  Text = 'text',
  Number = 'number',
  Password = 'password',
  Email = 'email',
  Tel = 'tel',
  URL = 'url',
  Search = 'search',
  Date = 'date',
  Time = 'time',
  Checkbox = 'checkbox',
  Radio = 'radio',
}
