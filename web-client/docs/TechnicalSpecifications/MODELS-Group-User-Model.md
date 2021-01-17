# Group User Model

## src: r4h/models

## Interface

```tsx
export interface ContactDetails {
  facebookGroup?: string;
  web?: { [id: string]: string }; // List of URLs
  phone?: string[];
  email?: string[];
}
```

```tsx
export interface ContactGroup {
  /** general contact information */
  general?: ContactDetails;
  /** details of how those that need help can interact with the organization  */
  getHelp?: ContactDetails;
  /** details of how those who want to help can interact with the organization  */
  volunteers?: ContactDetails;
}
```

# Relationships

# Diagrams
