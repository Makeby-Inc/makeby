module.exports = {
	plugins: ['prettier-plugin-tailwindcss'], // Tailwind CSS 관련 플러그인
	tailwindFunctions: ['cva', 'cn'], // Tailwind CSS 함수 사용 여부
	tabWidth: 1, // 탭 너비
	bracketSpacing: true, // 중괄호 내의 공백 사용 여부
	arrowParens: 'always', // 화살표 함수 인자에 괄호 사용 여부 ("항상 사용")
	endOfLine: 'auto', // 파일 끝의 개행문자 (OS에 따라 자동 설정)
	semi: false, // 문장 끝에 세미콜론 추가 여부
	useTabs: true, // 탭 대신 스페이스 사용 여부
	singleQuote: true, // 따옴표 사용 여부
	trailingComma: 'none', // 후행 쉼표 사용 규칙
	printWidth: 80 // 한 줄의 최대 길이
}
