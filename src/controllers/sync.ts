import { Request, Response } from 'express';
import axios from 'axios';
import Statistic from '../models/statistic';

export const create = async (req: Request, res: Response) => {
  try {
    let data = await getData();
    if (data === undefined) return;
    let value: Object = data.response;

    const statisticBD = await Statistic.find();

    if(statisticBD){
    statisticBD.forEach(async(data)=>{
    await Statistic.findByIdAndDelete(data._id);
    })
  }

    Object.values(value).forEach((element) => {
      let statistic = new Statistic({
        continent: element.continent,
        country: element.country,
        population: element.population,
        cases: {
          newer: element.cases.new,
          active: element.cases.active,
          critical: element.cases.critical,
          recovered: element.cases.recovered,
          M_pop: element.cases['1M_pop'],
          total: element.total,
        },
        deaths: {
          newer: element.deaths.new,
          M_pop: element.deaths['1M_pop'],
          total: element.deaths.total,
        },
        tests: {
          M_pop: element.tests['1M_pop'],
          total: element.tests.total,
        },
      });

      statistic.save((err) => {
        if (err) {
          return res.json({
            ok: false,
            msj: err,
          });
        }
      });
    });

    res.json({
      ok: true,
      statisticBD: value,
      usuario: 'data loaded successfully',
    });
  } catch (err) {
    return err;
  }
};

export const findStatistic = async (req: Request, res: Response) => {
  const { limit = 100 } = req.query;
  const statisticBD = await Statistic.find({}).skip(1).limit(Number(limit));
  let active = 0;
  let recovered = 0;
  let death = 0;

  statisticBD.forEach((element: any) => {
    const cases = element['cases'];
    const totalDeath = element['deaths'];

    active = active + cases.active;
    recovered = recovered + cases.recovered;
    death = death + totalDeath.total;
  });

  if (statisticBD.length === 0) {
    res.json({
      ok: false,
      statisticBD,
    });
  } else {
    res.json({
      ok: true,
      active: active,
      recovered: recovered,
      death: death,
      statisticBD,
    });
  }
};

export const getStatisticByCountry = async (req: Request, res: Response) => {
  let { country } = req.params;

  const statisticBD = await Statistic.find({ country });

  if (statisticBD.length > 0) {
    res.json({
      statisticBD,
    });
  } else {
    res.status(400).json({
      ok: false,
      msg: 'Record not found',
    });
  }
};

export const updateStaticByCountry = async (req: Request, res: Response) => {
  let id = req.params.id;
  let body = req.body;

  const infoUpdate = await Statistic.findByIdAndUpdate(id, body);
  /* Statistic.findByIdAndUpdate(id, { population: body }, { new: false }, (err: Error, statisticBD: any) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      statistic: statisticBD,
    });
  });*/
  console.log('finalizado');
  res.json({
    msg: 'Update',
    infoUpdate,
  });
};

const getData = async () => {
  let options: Object = {
    method: 'GET',
    url: 'https://covid-193.p.rapidapi.com/statistics/',
    headers: {
      'x-rapidapi-key': 'e435d6995emsh3f44d201236db5fp1f0278jsn4a4a162a13cb',
      'x-rapidapi-host': 'covid-193.p.rapidapi.com',
    },
  };

  const resp = await axios.request(options);

  return resp.data;
};