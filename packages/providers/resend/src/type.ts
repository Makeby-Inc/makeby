export interface EmailContentDto {
	firstName: string
}

export interface ResendRequest extends EmailContentDto {
	userName: string
}
