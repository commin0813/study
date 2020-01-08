package kr.co.fastcampus.cli;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.sql.Connection;

class Main {
	public static void main( String[] ar ) throws ClassNotFoundException, Exception {
		ApplicationContext context = new ClassPathXmlApplicationContext( "dao.xml" , "bean.xml" );
		ConnectionFactory connectionFactory = context.getBean( "connectionFactory" , ConnectionFactory.class );
		Connection connection = connectionFactory.getConnection( );
		System.out.println( "" );
//		Ab a1 = context.getBean( "Ab" , Ab.class );
//		Ab a2 = context.getBean( "Ab" , Ab.class );
//
//
//		// 기본은 싱글톤임
//		System.out.println( "Result : " + ( a1 == a2 ) );
//
//
//		Ab a3 = context.getBean( "Abc" , Ab.class );
//		Ab a4 = context.getBean( "Abc" , Ab.class );
//
//		// prototype으로 바꾸면 싱글톤이 아니게 객체를 새로 생성하여 리턴
//		System.out.println( "Result : " + ( a3 == a4 ) );


		// System.out.println( context );

		// NOTE Spring 프레임웍이 객체를 생성하여 반환해준다.
//		Dao dao = context.getBean( "dao" , Dao.class );
//		Dao new_dao = context.getBean( "new_dao3" , Dao.class );
//		Dao factory_dao = context.getBean( "factory_dao" , Dao.class );
//		Dao instance_dao = context.getBean( "instance_dao" , Dao.class );

//		dao.run( );

//		new_dao.run( );
//		factory_dao.run( );
//		instance_dao.run( );

//		Dao2 dao2 = context.getBean( "dao2" , Dao2.class );
//		dao2.run( );


	}
}


