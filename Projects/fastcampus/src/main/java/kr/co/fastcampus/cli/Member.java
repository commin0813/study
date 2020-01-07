package kr.co.fastcampus.cli;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


import java.sql.ResultSet;
import java.sql.SQLException;

@Getter
@Setter
@ToString
public class Member {
	private int id;
	private String username;
	private String password;

	public Member( int id , String username , String password ) {
		this.id = id;
		this.username = username;
		this.password = password;
	}

	public Member( ResultSet resultSet ) throws SQLException {
		id = resultSet.getInt( "id" );
		username = resultSet.getString( "username" );
		password = resultSet.getString( "password" );
	}


}
