// Example on how to customize the look at feel using Styles
// Import from 'docx' rather than '../build' if you install from npm
import * as fs from "fs";
import {
    AlignmentType,
    convertInchesToTwip,
    Document,
    HeadingLevel,
    LevelFormat,
    Packer,
    Paragraph,
    TextRun,
    UnderlineType,
} from "../build";

const doc = new Document({
    creator: "Clippy",
    title: "Sample Document",
    description: "A brief example of using docx",
    styles: {
        default: {
            heading1: {
                run: {
                    size: 28,
                    bold: true,
                    italics: true,
                    color: "FF0000",
                },
                paragraph: {
                    spacing: {
                        after: 120,
                    },
                },
            },
            heading2: {
                run: {
                    size: 26,
                    bold: true,
                    underline: {
                        type: UnderlineType.DOUBLE,
                        color: "FF0000",
                    },
                },
                paragraph: {
                    spacing: {
                        before: 240,
                        after: 120,
                    },
                },
            },
            listParagraph: {
                run: {
                    color: "#FF0000",
                },
            },
        },
        paragraphStyles: [
            {
                id: "aside",
                name: "Aside",
                basedOn: "Normal",
                next: "Normal",
                run: {
                    color: "999999",
                    italics: true,
                },
                paragraph: {
                    indent: {
                        left: convertInchesToTwip(0.5),
                    },
                    spacing: {
                        line: 276,
                    },
                },
            },
            {
                id: "wellSpaced",
                name: "Well Spaced",
                basedOn: "Normal",
                quickFormat: true,
                paragraph: {
                    spacing: { line: 276, before: 20 * 72 * 0.1, after: 20 * 72 * 0.05 },
                },
            },
        ],
    },
    numbering: {
        config: [
            {
                reference: "my-crazy-numbering",
                levels: [
                    {
                        level: 0,
                        format: LevelFormat.LOWER_LETTER,
                        text: "%1)",
                        alignment: AlignmentType.LEFT,
                    },
                ],
            },
        ],
    },
    sections: [
        {
            children: [
                new Paragraph({
                    text: "Test heading1, bold and italicized",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph("Some simple content"),
                new Paragraph({
                    text: "Test heading2 with double red underline",
                    heading: HeadingLevel.HEADING_2,
                }),
                new Paragraph({
                    text: "Option1",
                    numbering: {
                        reference: "my-crazy-numbering",
                        level: 0,
                    },
                    style: "aside",
                }),
                new Paragraph({
                    text: "Option5 -- override 2 to 5",
                    numbering: {
                        reference: "my-crazy-numbering",
                        level: 0,
                    },
                }),
                new Paragraph({
                    text: "Option3",
                    numbering: {
                        reference: "my-crazy-numbering",
                        level: 0,
                    },
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Some monospaced content",
                            font: {
                                name: "Monospace",
                            },
                        }),
                    ],
                }),
                new Paragraph({
                    text: "An aside, in light gray italics and indented",
                    style: "aside",
                }),
                new Paragraph({
                    text: "This is normal, but well-spaced text",
                    style: "wellSpaced",
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "This is a bold run,",
                            bold: true,
                        }),
                        new TextRun(" switching to normal "),
                        new TextRun({
                            text: "and then underlined ",
                            underline: {},
                        }),
                        new TextRun({
                            text: "and then emphasis-mark ",
                            emphasisMark: {},
                        }),
                        new TextRun({
                            text: "and back to normal.",
                        }),
                    ],
                }),
                new Paragraph({
                    style: "Strong",
                    children: [
                        new TextRun({
                            text: "Strong Style",
                        }),
                        new TextRun({
                            text: " - Very strong.",
                        }),
                    ],
                }),
            ],
        },
    ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("My Document.docx", buffer);
});
