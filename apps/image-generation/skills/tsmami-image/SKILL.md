---
name: tsmami-image
description: Draw an illustration of tsmami-san (つまみさん), a green sphere character that always sits inside a box. Use when the user asks for a picture of tsmami-san / つまみさん, e.g. "つまみさんの画像を作って", "〇〇するつまみさんを描いて", or "draw tsmami-san doing X". Takes a theme (and optionally a scene, style, and composition) and generates one square image with the bundled character reference.
---

# tsmami-san illustration

Generate one square image of tsmami-san for a theme the user gives. This skill only draws the image; it does not invent the theme.

## Inputs

- **Theme** (required): what tsmami-san is doing, e.g. "tsmami-san delivering mail on a paper airplane". If the user writes it in Japanese, translate it into a short English sentence that keeps "tsmami-san".
- **Scene**, **Style**, **Composition** (optional): use them only if the user gives all three. Do not make them up; leave those sections out instead.

If there is no theme at all, ask the user for one before generating.

## Steps

1. Attach `assets/tsmami-reference.png` to the image generation call as the input image. It is the only reference; do not use other images of the character.
2. Build the prompt from the template below. Fill in the theme, include the Scene / Style / Composition sections only when given, and keep every other line as written.
3. Generate **one** square (1:1) image. Make more only if the user asks.
4. Check the result. If tsmami-san is outside a box, has legs or feet, or the image contains text, tell the user what went wrong and ask whether to try again.

## Prompt template

```text
Create a new square illustration of the character "tsmami-san" (also called つまみさん).

Reference image:
Image 1 is a character reference for tsmami-san only. Keep its identity, but do not copy its pose, framing, background, or art style.

Theme:
{theme}

Scene:
{scene}

Style:
{style}

Composition:
{composition}

Subject (tsmami-san):
- A round green sphere sitting inside a box. It is always inside a box.
- The box is usually a cardboard box, but another kind of box is fine if it suits the scene.
- Usually a calm, neutral face like the reference. The sphere is usually green; another color is fine only if the scene calls for it.
- The sphere has no arms and no legs.
- If the scene needs hands, prefer using the box flaps as hands. Only as a last resort, add small, subtle hands in the same color as the sphere, emerging near the edge of the box. Never grow hands out of the box walls.
- Never draw legs or feet. Choose a pose, viewpoint, or foreground object so that none are needed.
- Render tsmami-san with materials and shading that match the chosen art style.

Constraints:
- A complete illustration with a fully drawn background that fits the scene; not a sticker or cutout.
- No text, letters, captions, logos, signatures, or watermarks.
- Keep it wholesome and family-friendly.
```
