package sdu.project.chooserback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import sdu.project.chooserback.enums.Level;
import sdu.project.chooserback.models.Task;

import java.util.Optional;


public interface TaskRepository extends JpaRepository<Task, Long> {

    @Query("SELECT t from Task t where t.level = :level order by Random() limit 1")
    Optional<Task> findRandomTaskByLevel(Level level);

}
