package kr.co.fastcampus.cli.di;

public class B {
	private boolean condition;

	public B( boolean condition ) {
		this.condition = condition;
	}

	public Integer calc( ) {
		if ( condition == true ) {
			return 1;
		} else {
			return 0;
		}
	}
}
