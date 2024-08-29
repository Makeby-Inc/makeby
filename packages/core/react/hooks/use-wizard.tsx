'use client'

import { useState } from 'react'

/**
 * 위저드(wizard)폼을 구현하기 위한 hook
 * @param steps wizard의 단계를 나타내는 문자열 배열
 * @param options
 * @param options.initialStep 초기 wizard 단계
 * @example
 * const { Wizard, currentStep, setStep } = useWizard(["step1", "step2", "step3"]);
 * <Wizard>
 *  <Wizard.Step name="step1">
 *    <div>
 *      1페이지
 *    <button onClick={() => setStep("step2")}>다음으로</button>
 *    </div>
 *  </Wizard.Step>
 *  <Wizard.Step name="step2">
 *    <div>
 *      <button onClick={() => setStep("step1")}>이전으로</button>
 *        2페이지
 *      <button onClick={() => setStep("step3")}>다음으로</button>
 *    </div>
 *  </Wizard.Step>
 * <Wizard />
 */
export function useWizard<T extends string>(
	steps: T[],
	options?: {
		initialStep?: T
	}
) {
	const [currentStep, setStep] = useState(options?.initialStep || steps[0])
	const Step = ({ name, children }: { name: T; children: React.ReactNode }) => {
		return currentStep === name ? <>{children}</> : null
	}
	const Wizard = (props: React.HTMLAttributes<HTMLDivElement>) => {
		return <div {...props} />
	}
	Wizard.Step = Step

	return { Wizard, currentStep, setStep } as const
}
