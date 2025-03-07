import { expect } from "chai";

import { Formatter } from "@export/formatter";

import { Settings } from "./settings";

describe("Settings", () => {
    describe("#constructor", () => {
        it("should create a empty Settings with correct rootKey", () => {
            const settings = new Settings({});
            const tree = new Formatter().format(settings);

            expect(Object.keys(tree)).has.length(1);
            expect(tree["w:settings"]).to.be.an("array");
        });

        it("should add updateFields setting", () => {
            const settings = new Settings({
                updateFields: true,
            });

            const tree = new Formatter().format(settings);
            expect(Object.keys(tree)).has.length(1);
            expect(tree["w:settings"]).to.be.an("array");

            expect(tree["w:settings"]).to.deep.include({
                "w:updateFields": {},
            });
        });

        it("should indicate modern word compatibility by default", () => {
            const settings = new Settings({});

            const tree = new Formatter().format(settings);
            expect(Object.keys(tree)).has.length(1);
            expect(tree["w:settings"]).to.be.an("array");

            const compat = tree["w:settings"][2];
            expect(compat).to.be.an("object").with.keys("w:compat");
            expect(compat["w:compat"]).to.deep.include({
                "w:compatSetting": {
                    _attr: {
                        "w:val": 15,
                        "w:uri": "http://schemas.microsoft.com/office/word",
                        "w:name": "compatibilityMode",
                    },
                },
            });
        });

        it("should add trackRevisions setting", () => {
            const settings = new Settings({
                trackRevisions: true,
            });

            const tree = new Formatter().format(settings);
            expect(Object.keys(tree)).has.length(1);
            expect(tree["w:settings"]).to.be.an("array");

            expect(tree["w:settings"]).to.deep.include({
                "w:trackRevisions": {},
            });
        });
    });
});
