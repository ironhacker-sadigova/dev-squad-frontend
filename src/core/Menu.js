import React from 'react';
import {Link} from 'react-router-dom';

// We can create a functional component, we don't need a class its gonna be without state

const Menu = () =>

    <div>
<div className="menu">
<a href="">        <Link to = "/"> Home  </Link>  </a>
<a href="">        <Link to = "/signup"> Join  </Link> </a>
<a href="">        <Link to = "/signin"> Members </Link>   </a>
<a href="">Contact</a>
<div class="marca"></div>
</div>

</div>



export default Menu;