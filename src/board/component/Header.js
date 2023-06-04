import React from 'react';

const Header = ({boardTitle}) => {
    return (
        <div>
            <h3 className="boardTitle">{boardTitle}</h3>
        </div>
    )
}

export default Header;