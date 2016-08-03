console.time("time");

var fs = require('fs');
var u = require('underscore');
var MongoClient = require('mongodb').MongoClient, assert = require('assert');
var ag = require('./ag_class.js');

ag.array_populacao_experimento = [300,300,300,300,300,300,300,300,300,300];

for(aux1 in ag.array_populacao_experimento){
	for(aux2 in u.range(3)){
		ag.qtd_pop = ag.array_populacao_experimento[aux1];
		ag.play_ag(1);
		ag.experimento++;
		ag.zerar_variaveis();
	}
}

var data = ag.array_experimento;

MongoClient.connect("mongodb://localhost:27017/ag3", function(err, db) {
	assert.equal(null, err);
	experimento_collection = db.collection('experimentos_canonico');
	for(i in data){
		experimento_collection.insertOne(data[i],{w:1},function(err, r) {
			assert.equal(null, err);
			assert.equal(1, r.insertedCount);
		});
	}
	db.close();
});

console.timeEnd("time");
