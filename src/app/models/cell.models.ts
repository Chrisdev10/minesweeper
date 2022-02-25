export class Cell{
    private isBomb: boolean = false;
    private isShow: boolean = false;
    private value: string = "X";

	constructor() {
	}


    /**
     * Getter $isBomb
     * @return {boolean }
     */
	public get $isBomb(): boolean  {
		return this.isBomb;
	}

    /**
     * Setter $isBomb
     * @param {boolean } value
     */
	public set $isBomb(value: boolean ){
		this.isBomb = value;
	}


    /**
     * Getter $isShow
     * @return {boolean }
     */
	public get $isShow(): boolean  {
		return this.isShow;
	}

    /**
     * Setter $isShow
     * @param {boolean } value
     */
	public set $isShow(value: boolean ) {
		this.isShow = value;
	}


    /**
     * Getter $value
     * @return {string }
     */
	public get $value(): string  {
		return this.value;
	}

    /**
     * Setter $value
     * @param {string } value
     */
	public set $value(value: string ) {
		this.value = value;
	}


    
    
}