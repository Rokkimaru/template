import React, { useEffect, useState } from 'react';

interface IImage {
    url: string;
    name: string;
  }
  
export interface IContent {
    id: string;
    name: string;
    description?: string;
    images: IImage[];
    artists: IImage[];
  }
  
export  interface ISong{
    id: string;
    name: string;
    album: IContent;
    description?: string;
    artists: IImage[];
  }