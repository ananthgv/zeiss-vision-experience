ZEISS Vision Experience: Design Philosophy & Implementation Guide

This document outlines the core design and functional principles for the ZEISS Vision Experience React application. It is intended to guide AI agents and developers in maintaining a consistent, premium, and user-friendly interface.

1. Core Philosophies

Apple Design Principles (UI/UX)

Minimalism & Whitespace: Prioritize large areas of whitespace to reduce cognitive load. Every element must earn its place on the screen.

Progressive Disclosure: Do not overwhelm the user. Hide clinical data (like refraction tables) or advanced filters until the specific action (like a scan) is completed.

Fluid Motion: Use high-quality animations (animate-pop-in, animate-fade-in, animate-scan-horizontal) to signify state changes. Transitions should feel "weighty" and organic.

Tactile Elements: Buttons and cards should feature rounded corners (rounded-[2rem] or rounded-full) and subtle, soft shadows to create a sense of depth (glassmorphism).

Amazon "Working Backwards"

The Goal is Vision: The user doesn't want "lenses"; they want "clarity." Every step must lead intuitively toward the final vision package.

Transparent Breakdowns: Avoid hidden costs. Real-time pricing updates and receipt-style investment breakdowns build trust and reduce friction at checkout.

ZEISS Clinical Integrity

Precision Branding: Use official ZEISS Blue (#003b8e) and high-fidelity product imagery.

Machine-Human Bridge: When interacting with clinical machines (VISUCORE 500, VISUFIT 1000), provide clear physical guidance (e.g., "Walk to the device") to bridge the gap between the digital UI and the physical store.

2. Visual Standards

Color Palette

ZEISS Blue: #003b8e (Logo and primary accents)

Action Blue: #0071C5 (Clinical badges and primary buttons)

Surface: #F5F5F7 (Apple-style neutral background)

Card Background: White with 90-95% opacity and backdrop-blur-md.

Typography

Headings: Thin/Light weights (font-light) for large titles to create an elegant, non-aggressive feel.

Labels: Bold, uppercase, and tracking-wide (tracking-widest) for clinical status or category labels.

Imagery

Product Shots: Always use high-fidelity, macro, or transparent-background images for lenses and frames.

Hero Visuals: Clinical machines should be presented in circular, white-bordered containers with object-contain to prevent clipping.

3. Interaction Patterns

Real-time Logic

Dynamic Pricing: Estimated costs must update instantly as lifestyle sliders move, scaling between a defined range (e.g., $100 - $1,500).

AI Recommendations: Present exactly three lens options: a "Top Match," an "Alternative," and a "Standard" option to provide agency without the "paradox of choice."

Contextual Awareness

Patient Identity: Always keep the Patient Name and DOB visible in the header once entered. This ensures the staff and patient always know who the "bespoke" profile belongs to.

The "Why" Factor: Every lens recommendation must include an insight card explaining "Why this design?" using simple, benefit-driven language.

4. Component Implementation Checklist

[ ] Multi-Select Frames: Allow users to pick multiple frame pairs.

[ ] Cart Math: Final price = (Lens Price + Coating Price) * Pair Count + Sum of individual Frame Prices.

[ ] Wizard Navigation: Gated forward-progress (must finish scan to move on) but free backward-progress.

[ ] AI Bragging: Subtly mention the analysis of 4,000,000+ combinations to add a "wow" factor to recommendations.