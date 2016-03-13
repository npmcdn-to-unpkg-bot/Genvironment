import {Component} from 'angular2/core'
import {Http, HTTP_PROVIDERS} from 'angular2/http'
import {OnInit} from "angular2/core";
import {LineChartDirective} from '../line-chart/line-chart.directive'

@Component({
    selector: 'games-app',
    viewProviders: [HTTP_PROVIDERS],
    templateUrl: 'app/games/games.html',
    directives: [LineChartDirective]

})

export class GameComponent implements OnInit {

    gameData:any;

    constructor(private http:Http) {

    }

    transformGamesData(url) {


        this.http.get(url)
            .map(res=> res.json())
            .subscribe(res => {
                let dataObject = d3.merge(
                    res.map(
                        (d) => {
                            d.Games.forEach(
                                (g) => {
                                    g.Date = d.Date
                                }
                            );

                            return d.Games
                        })
                );


                let dataMap = d3.map();


                d3.merge([
                    d3.nest().key(d => d.Away).entries(dataObject),
                    d3.nest().key(d => d.Home).entries(dataObject)
                ]).forEach(d => {

                    if (dataMap.has(d.key)) {

                        dataMap.set(d.key, d3.merge([dataMap.get(d.key), d.values]))
                            .sort((a, b) => d3.ascending(a.Date, b.Date))

                    } else {
                        dataMap.set(d.key, d.values);

                    }


                });


                dataMap.forEach((key, values) => {

                    let games = [];
                    values.forEach((g, i) => {
                        games.push(gameOutCome(key, g, games))
                    });

                    dataMap.set(key, games);


                });

                let beginDate:any = res[0].Date;
                let finalDate:any = res[res.length - 1].Date;

                this.gameData = {data: dataMap, beginDate: beginDate, finalDate: finalDate};
                

            });


        function gameOutCome(team, game, games) {
            let isAway:boolean = (game.Away === team);
            let goals = isAway ? +game.AwayScore : +game.HomeScore;
            let allowed = isAway ? +game.HomeScore : +game.AwayScore;
            let decision = (goals > allowed) ? 'win' : (goals < allowed) ? 'loss' : 'draw';
            let points = (goals > allowed) ? 3 : (goals < allowed) ? 0 : 1;
            return {
                date: game.Date,
                team: team,
                align: isAway ? 'away' : 'home',
                opponent: isAway ? game.Home : game.Away,
                goals: goals,
                allowed: allowed,
                venue: game.Venue,
                decision: decision,
                points: points,
                leaguePoints: d3.sum(games, (d) => d.points) + points
            }


        }


    }

    ngOnInit() {

        this.transformGamesData('app/games/eng2-2013-14.json');


    }

}