package kr.co.fastcampus.cli.di;

public class A {
	private B b = null;

	public A( B b ) {
		this.b =b;
	}

	public void print( ) {
		System.out.println( b.calc( ) );
	}
}
