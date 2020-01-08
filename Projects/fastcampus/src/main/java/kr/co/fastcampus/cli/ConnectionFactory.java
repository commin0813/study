package kr.co.fastcampus.cli;

import lombok.Getter;
import org.springframework.beans.factory.InitializingBean;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;


//public class ConnectionFactory implements InitializingBean {
public class ConnectionFactory {
	private String driverClass;
	private String url;
	private String user;
	private String password;

	@Getter
	private Connection connection = null;

	public ConnectionFactory( String driverClass , String url , String user , String password ) {
		this.driverClass = driverClass;
		this.url = url;
		this.user = user;
		this.password = password;
	}

	public void init( ) throws Exception {
		System.out.println( "Create Connection.. By init-method" );
		this.connection = createConnection( );
	}

//	@Override
//	public void afterPropertiesSet( ) throws Exception {
//		System.out.println( "Create Connection.." );
//		this.connection = createConnection( );
//		System.out.println( "Create Connection.. SUCCESS" );
//	}

	public Connection createConnection( ) throws SQLException {
		try {
			Class.forName( this.driverClass );
		} catch ( ClassNotFoundException e ) {
			e.printStackTrace( );
		}
		return DriverManager.getConnection( url , user , password );
	}
}
