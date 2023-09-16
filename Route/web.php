<?php

use App\Controllers\Api\ArticleTailleController;
use App\Controllers\ApproController;
use App\Controllers\ArticleConfectionController;
use App\Controllers\ArticleVenteController;
use App\Controllers\CategorieController;
use App\Controllers\UniteCategorieController;
use App\Core\Router;

Router::route("/categorie", [CategorieController::class, 'index']);
Router::route("/categorie_add", [CategorieController::class, 'create']);
Router::route("/store-categorie", [CategorieController::class, 'store']);
Router::route("/article", [ArticleConfectionController::class, 'index']);
Router::route("/article_add", [ArticleConfectionController::class, 'create']);
Router::route("/store-article", [ArticleConfectionController::class, 'store']);
Router::route("/store-vente", [ArticleVenteController::class, 'store']);
Router::route("/store-articletaille", [ArticleTailleController::class, 'store']);
Router::route("/appro", [ApproController::class, 'index']);
Router::route("/update-paiement-appro", [ApproController::class, 'updatePaiement']);
Router::route("/filterall", [ApproController::class, 'show_all_appro']);
Router::route("/appro-add", [ApproController::class, 'create']);
Router::route("/store-appro", [ApproController::class, 'store']);
Router::route("/articlevente-add", [ArticleVenteController::class, 'create']);
Router::route("/articlevente-getData", [ArticleVenteController::class, 'index']);
Router::route("/unitecategorie", [UniteCategorieController::class, 'index']);
