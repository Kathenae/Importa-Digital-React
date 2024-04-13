<?php

namespace App\Helpers;

class Toast
{
   public static function success($msg)
   {
      return [
         'flash.success' => $msg
      ];
   }

   public static function warning($msg)
   {
      return [
         'flash.warning' => $msg
      ];
   }

   public static function error($msg)
   {
      return [
         'flash.error' => $msg
      ];
   }
}