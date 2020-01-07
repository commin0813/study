package fastcampus;


import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import org.junit.Assert;
import org.junit.jupiter.api.Test;

import java.util.Objects;

public class BeanScopeTest {

	@EqualsAndHashCode
	@AllArgsConstructor
	public class A {
		private int a1;
		private String a2;

		public A( ) {

		}

	}

	@Test
	public void testIdentity( ) {
		//@TODO 동일성 vs 동등성
		//동일성(Identity) : 객체 주소가 같다. - (obj1 == obj2 == obj3) == true
		//동등성(equals) : 객체 값이 같다. - obj1.equals(obj2) == true;
		A a1 = new A( );
		A a2 = a1;

		Assert.assertSame( a1 , a2 );


	}

	@Test
	public void testEquals( ) {
		A a1 = new A( 10 , "Hello World" );
		A a2 = new A( 10 , "Hello World" );
		A a3 = new A( 5 , "Hello" );

		Assert.assertEquals( a1 , a2 );
		Assert.assertNotEquals( a2 , a3 );

	}

}
