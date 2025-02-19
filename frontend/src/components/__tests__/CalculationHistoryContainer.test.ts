// This is a *blackbox component test* (not a unit test and not an end-to-end test).
// https://vuejs.org/guide/scaling-up/testing#component-testing
import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import CalculationHistoryContainer from "@/components/CalculationHistoryContainer.vue";

describe("CalculationHistoryContainer component", () => {
    it("Renders props as text when passed", () => {
        const wrapper = mount(CalculationHistoryContainer, {
            props: {
                history: ["1 + 1 = 2", "2 + 2 = 4"],
            },
        });

        expect(wrapper.text()).toContain("1 + 1 = 2");
        expect(wrapper.text()).toContain("2 + 2 = 4");
    });
});
