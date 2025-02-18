// This is a *whitebox component test* (not a unit test and not an end-to-end test).
// https://vuejs.org/guide/scaling-up/testing#component-testing
import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BasicCalculator from "@/components/BasicCalculator.vue";

describe("BasicCalculator component", () => {
    it("Emits evaluate event on calculate click", async () => {
        const wrapper = mount(BasicCalculator);
        const equalsButton = wrapper.find("#equals");

        if (equalsButton === undefined) {
            throw new Error("Could not find equals button");
        }

        await equalsButton.trigger("click");
        await wrapper.vm.$nextTick();

        expect(wrapper.emitted("evaluate")).toBeTruthy();
    });

    it("Clicking buttons changes the display", async () => {
        const wrapper = mount(BasicCalculator);

        await wrapper.find("#one").trigger("click");
        await wrapper.find("#two").trigger("click");
        await wrapper.find("#three").trigger("click");
        await wrapper.find("#four").trigger("click");
        await wrapper.find("#five").trigger("click");
        await wrapper.find("#six").trigger("click");
        await wrapper.find("#seven").trigger("click");
        await wrapper.find("#eight").trigger("click");
        await wrapper.find("#nine").trigger("click");
        await wrapper.find("#zero").trigger("click");
        await wrapper.find("#add").trigger("click");

        await wrapper.vm.$nextTick();
        expect(wrapper.find("#display").text()).toBe("1234567890+");
    });

    it("Clear button clears the display", async ({ skip }) => {
        const wrapper = mount(BasicCalculator);

        await wrapper.find("#one").trigger("click");
        await wrapper.find("#two").trigger("click");
        await wrapper.find("#three").trigger("click");

        const display = wrapper.find("#display");

        // If the display is not showing, then this is not a problem with the clear event...
        // This is a problem with updating the display correctly which is tested in the previous test.
        if (display === undefined || display.text() !== "123") {
            skip();
        }

        await wrapper.find("#clear").trigger("click");
        await wrapper.vm.$nextTick();

        expect(wrapper.find("#display").text()).toBe("");
        expect(wrapper.emitted("clear")).toBeTruthy();
    });

    it.todo(
        "Adding two addition symbols consecutively does not change the display",
        async () => {
            const wrapper = mount(BasicCalculator);

            await wrapper.find("#one").trigger("click");
            await wrapper.find("#add").trigger("click");
            await wrapper.find("#add").trigger("click");

            await wrapper.vm.$nextTick();
            expect(wrapper.find("#display").text()).toBe("1+");
        }
    );
});
