package kr.co.fastcampus.cli;

public class DaoFactory {
	public Dao create( ) {
		System.out.println( "Beans by 'Instance Factory' Create Class" );
		return new Dao( );
	}
}
