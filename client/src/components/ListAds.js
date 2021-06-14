import React, { useState, useEffect } from 'react';
import s from './Style.module.css';

const Adver = (props) => {
    return (
        <>
            <div>{props.id}</div>
            <div>{props.ad}</div>
            <div>{props.price}</div>
        </>
    )
};

const OneAdver = (props) => {
    let id = props.articles.map( ad => <Adver id={ad.id} key={ad.id} />);
    let ad = props.articles.map( ad => <Adver ad={ad.ad} key={ad.id} />);
    let price = props.articles.map( ad => <Adver price={ad.price} key={ad.id} />);

    return (
        <div className={s.content}>
             <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Ad</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={ad.id}>
                             <td>{id}</td>
                            <td>{ad}</td>
                            <td>{price}</td>
                        </tr>
                    
                </tbody>
            </table>
            
            
        </div>
    )
}

const ListAds = () => {
    const [articles, setArticles] = useState([]);

    const getAds = async () => {
        try {
            const response = await fetch("http://localhost:5000/ads");
            const jsonData = await response.json();

            setArticles(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getAds();
    }, [])

    return (
        <>
            <OneAdver articles={articles} />
        </>
    )
}

export default ListAds;