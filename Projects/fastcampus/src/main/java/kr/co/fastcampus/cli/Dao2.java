package kr.co.fastcampus.cli;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Dao2 {
	public Dao2( ) {
		System.out.println( "Beans by 'Basic Constructure' Create Class" );
	}

	public Dao2( String param ) {
		System.out.println( "Beans by 'Arg Constructure' Create Class" );
	}

	public static Dao2 createDao ( ) {
		System.out.println( "Beans by 'Factory Method' Create Class" );
		return new Dao2( );
	}


		Connection connection;

	public Dao2( Connection connection ) {
		this.connection = connection;
	}


	public void run ( ) throws Exception{
		Statement statement = connection.createStatement( );
		//Transaction 처리
		connection.setAutoCommit( false );

		statement.execute( "create table member(id int auto_increment,username varchar(255) not null, password varchar(256) not null,primary key(id))" );
		try {
			statement.executeUpdate( "insert into member(username,password) values('khm','1234')" );
			connection.commit( );
		} catch ( SQLException e ) {
			connection.rollback( );
		}
		ResultSet resultSet = statement.executeQuery( "select id,username,password from MEMBER " );
		while ( resultSet.next( ) ) {
			Member member = new Member( resultSet );
			System.out.println( member.toString( ) );
		}

	}

}
