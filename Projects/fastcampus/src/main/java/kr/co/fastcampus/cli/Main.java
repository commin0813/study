package kr.co.fastcampus.cli;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

class Main {
	public static void main( String[] ar ) throws ClassNotFoundException, Exception {
		ApplicationContext context = new ClassPathXmlApplicationContext( "dao.xml" );
		// System.out.println( context );

		// NOTE Spring 프레임웍이 객체를 생성하여 반환해준다.
//		Dao dao = context.getBean( "dao" , Dao.class );
		Dao2 dao2 = context.getBean( "dao2" , Dao2.class );
//		Dao new_dao = context.getBean( "new_dao3" , Dao.class );
//		Dao factory_dao = context.getBean( "factory_dao" , Dao.class );
//		Dao instance_dao = context.getBean( "instance_dao" , Dao.class );

//		dao.run( );
		dao2.run( );
//		new_dao.run( );
//		factory_dao.run( );
//		instance_dao.run( );

	}
}


