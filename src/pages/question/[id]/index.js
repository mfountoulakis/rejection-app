// import React from 'react';
// import { useRouter } from 'next/router';
import Layout from '../../../features/layout/layout-component';
import Questions from '../../../features/questions/index';
import { compose } from 'redux';

export default compose(Layout)(Questions);
