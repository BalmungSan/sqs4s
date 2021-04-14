package sqs4s.api.lo

import cats.effect.Async
import cats.syntax.all._
import org.http4s.{Request, Uri}
import org.typelevel.log4cats.Logger
import sqs4s.api.SqsConfig
import sqs4s.api.errors.UnexpectedResponseError

import scala.xml.Elem

final case class DeleteQueue[F[_]: Async](
  sqsEndpoint: Uri
) extends Action[F, DeleteQueue.Result] {

  def mkRequest(config: SqsConfig[F], logger: Logger[F]): F[Request[F]] = {
    val param = List(
      Some("Action" -> "DeleteQueue"),
      version
    ).flatten

    SignedRequest.get[F](
      param,
      sqsEndpoint,
      config.credentials,
      config.region
    ).render(logger)
  }

  def parseResponse(response: Elem): F[DeleteQueue.Result] = {
    val rid = (response \\ "RequestId").text
    rid
      .nonEmpty
      .guard[Option]
      .as(DeleteQueue.Result(rid).pure[F])
      .getOrElse(
        Async[F].raiseError(UnexpectedResponseError("RequestId", response))
      )
  }
}

object DeleteQueue {
  final case class Result(requestId: String)
}
