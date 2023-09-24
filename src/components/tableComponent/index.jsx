import React from "react";
import { data } from "../../utils/data";

const TableComponent = () => {
  const getAlcoholFlavanoids = (alcoholType) => {
    const result = data.filter((item) => {
      if (item.Alcohol === alcoholType) return item.Flavanoids;
    });
    return result;
  };

  const getFlavanoidsMean = (alcoholType) => {
    const alcoholFlavanoids = getAlcoholFlavanoids(alcoholType);
    const length = alcoholFlavanoids.length;

    const alcoholFlavanoidsSum = alcoholFlavanoids.reduce((acc, item) => {
      return acc + item.Flavanoids;
    }, 0);
    const alcoholFlavanoidsMean = alcoholFlavanoidsSum / length;

    return alcoholFlavanoidsMean.toFixed(3);
  };

  const getFlavanoidsMedian = (alcoholType) => {
    const alcoholFlavanoids = getAlcoholFlavanoids(alcoholType);
    const length = Math.floor(alcoholFlavanoids.length / 2);
    alcoholFlavanoids.sort((a, b) => a.Flavanoids - b.Flavanoids);
    if (alcoholFlavanoids.length % 2 !== 0) {
      return alcoholFlavanoids[length - 1].Flavanoids.toFixed(3);
    } else {
      const sum =
        alcoholFlavanoids[length - 1].Flavanoids +
        alcoholFlavanoids[length].Flavanoids;

      return (sum / 2).toFixed(3);
    }
  };

  const getFlavanoidsMode = (alcoholType) => {
    const alcoholFlavanoids = getAlcoholFlavanoids(alcoholType);
    const counts = {}
    alcoholFlavanoids.forEach(ele => {
      if(counts[ele.Flavanoids]) {
        counts[ele.Flavanoids] += 1
       }else{
       counts[ele.Flavanoids] = 1
    }})
    return Math.max.apply(null, Object.values(counts)).toFixed(3);
  };

  const gamma = (alcoholType)=>{
    const gammaResult = [];
    data.filter((item) => {
      if (item.Alcohol === alcoholType) {gammaResult.push((item.Ash*item.Hue)/item.Magnesium)};
    });
    return gammaResult;    
  }
  
  const gammaMean = (alcoholType) =>{
    const gammaArr = gamma(alcoholType);
    const length = gammaArr.length;

    const gammaSum = gammaArr.reduce((acc, item)=>{
      return acc+item;
    })
    const gMean =  gammaSum/length;
    return gMean.toFixed(3);
  }
  const gammaMedian = (alcoholType) =>{
    const gammaArr = gamma(alcoholType);
    const length = Math.floor(gammaArr.length / 2);
    gammaArr.sort((a, b) => a.Flavanoids - b.Flavanoids);
    if (gammaArr.length % 2 !== 0) {
      return gammaArr[length - 1].toFixed(3);
    } else {
      const sum =
      gammaArr[length - 1] +
      gammaArr[length];

      return (sum / 2).toFixed(3);
    }
   
  }
  const gammaMode = (alcoholType) =>{
    const gammaArr = gamma(alcoholType);
    const counts = {}
    gammaArr.forEach(ele => {
      if(counts[ele]) {
        counts[ele] += 1
       }else{
       counts[ele] = 1
    }})
    return Math.max.apply(null, Object.values(counts)).toFixed(3);
   
  }
  return (<>
    <table>
      <thead>
      <tr>
        <th>Measure</th>
        <th>Alcohol 1</th>
        <th>Alcohol 2</th>
        <th>Alcohol 3</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th>Flavanoids Mean</th>
        <td>{getFlavanoidsMean(1)}</td>
        <td>{getFlavanoidsMean(2)}</td>
        <td>{getFlavanoidsMean(3)}</td>
      </tr>
      <tr>
        <th>Flavanoids Median</th>
        <td>{gammaMedian(1)}</td>
        <td>{gammaMedian(2)}</td>
        <td>{gammaMedian(3)}</td>
      </tr>
       <tr>
        <th>Flavanoids Median</th>
        <td>{getFlavanoidsMode(1)}</td>
        <td>{getFlavanoidsMode(2)}</td>
        <td>{getFlavanoidsMode(3)}</td>
      </tr>
      </tbody>
    </table>
     <table>
      <thead>
     <tr>
       <th>Measure</th>
       <th>Alcohol 1</th>
       <th>Alcohol 2</th>
       <th>Alcohol 3</th>
     </tr>
     </thead>
     <tbody>
     <tr>
       <th>Gamma Mean</th>
       <td>{gammaMean(1)}</td>
       <td>{gammaMean(2)}</td>
       <td>{gammaMean(3)}</td>
     </tr>
     <tr>
       <th>Gamma Median</th>
       <td>{getFlavanoidsMedian(1)}</td>
       <td>{getFlavanoidsMedian(2)}</td>
       <td>{getFlavanoidsMedian(3)}</td>
     </tr>
      <tr>
       <th>Gamma Mode</th>
       <td>{gammaMode(1)}</td>
       <td>{gammaMode(2)}</td>
       <td>{gammaMode(3)}</td>
     </tr>
     </tbody>
   </table>
   </>
  );
};

export default TableComponent;
