import React from 'react';

import Header from '../../components/header';

const PdfViewer = ({navigation}) => {
    const { title, document, extension } = navigation.state.params;

    return(
        <>
            <Header navigation={navigation} title={title || 'Document Viewer'} />
        </>
    )
};

export default PdfViewer