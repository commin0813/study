package kr.co.fastcampus.cli.di;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Main {
	public static void main( String[] args ) {
//		boolean condition = true;
//		B b = new B( condition );
//		A a = new A( b );
//		a.print( );


		ApplicationContext context = new ClassPathXmlApplicationContext( "dao.xml" );
		A context_a = context.getBean( "a" , A.class );
		B context_b = context.getBean( "b" , B.class );

		context_a.print();

	}
}
