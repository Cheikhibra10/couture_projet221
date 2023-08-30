<?php
namespace App\Core;

class Pagination
{
    private $itemsPerPage;

    public function __construct($itemsPerPage)
    {
        $this->itemsPerPage = $itemsPerPage;
    }

    public function getOffset($page)
    {
        return ($page - 1) * $this->itemsPerPage;
    }

    public function getPaginatedData($data, $page)
    {
        $offset = $this->getOffset($page);
        return array_slice($data, $offset, $this->itemsPerPage);
    }

    public function getTotalPages($totalItems)
    {
        return ceil($totalItems / $this->itemsPerPage);
    }
}
